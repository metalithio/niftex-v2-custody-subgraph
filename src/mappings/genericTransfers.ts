import {
	log,
	Address,
	BigInt
} from "@graphprotocol/graph-ts"
import {
  Transfer,
} from "../../generated/GenericTransfers/TransferPermutations"
import {
	ERC721Metadata
} from "../../generated/GenericTransfers/ERC721Metadata"
import {
	Wallet,
	Nft
} from "../../generated/schema"

export function handleTransfer(event: Transfer): void {

	// !WARNING punk rinkeby address
	// skip because it throws a useless Transfer event
	if (event.address.toHex() == "0xee321008dd7f9267cd5ea611da40d2d83e5fa15f") return

	let walletTo = Wallet.load(event.params.to.toHex())
	let walletFrom = Wallet.load(event.params.from.toHex())

	let id = event.address.toHexString() + '_' + event.params.tokenId.toString()

	if (walletTo !== null) {
		let entity = new Nft(id)
		entity.wallet = walletTo.id
		entity.registry = event.address.toHexString()
		entity.tokenId = event.params.tokenId
		entity.txnHash = event.transaction.hash

		let registry = ERC721Metadata.bind(event.address as Address)

		let nameResult = registry.try_name()
		if (!nameResult.reverted) {
			entity.name = nameResult.value
		}
		let symbolResult = registry.try_symbol()
		if (!symbolResult.reverted) {
			entity.symbol = symbolResult.value
		}
		let tokenURIResult = registry.try_tokenURI(event.params.tokenId)
		if (!tokenURIResult.reverted) {
			entity.uri = tokenURIResult.value
		}

		let decimalsResult = registry.try_decimals()
		if (decimalsResult.reverted) {
			log.warning("try_symbol reverted", [])
			entity.decimals = 13370455
		} else {
			log.warning("try_decimals: {}", [BigInt.fromI32(decimalsResult.value).toString()])
			entity.decimals = decimalsResult.value
		}

		entity.save()
	}

	// leaving wallet
	if (walletFrom != null) {
		let entity = Nft.load(id)
		entity.oldWallet = entity.wallet
		entity.wallet = "0x0000000000000000000000000000000000000000"
		entity.save()
	}
}
