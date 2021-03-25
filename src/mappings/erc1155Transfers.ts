import {
	log,
	Address
} from "@graphprotocol/graph-ts"
import {
  TransferSingle,
	TransferBatch,
	ERC1155
} from "../../generated/ERC1155/ERC1155"
// import {
// 	ERC721Metadata
// } from "../../generated/GenericTransfers/ERC721Metadata"
import {
	Wallet,
	Nft
} from "../../generated/schema"

export function handleERC1155TransferSingle(event: TransferSingle): void {

	let walletTo = Wallet.load(event.params.to.toHex())
	let walletFrom = Wallet.load(event.params.from.toHex())

	let id = event.address.toHexString() + '_' + event.params.id.toString()

	if (walletTo !== null) {
		let entity = new Nft(id)
		entity.wallet = walletTo.id
		entity.registry = event.address.toHexString()
		entity.tokenId = event.params.id
		entity.txnHash = event.transaction.hash
		entity.value = event.params.value
		entity.decimals = 13370455

		let registry = ERC1155.bind(event.address as Address)
		let uriResult = registry.try_uri(event.params.id)
		if (!uriResult.reverted) {
			entity.uri = uriResult.value
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

export function handleERC1155TransferBatch(event: TransferBatch): void {

	let walletTo = Wallet.load(event.params.to.toHex())
	let walletFrom = Wallet.load(event.params.from.toHex())

	if (walletTo !== null) {
		let idsArray = event.params.ids
		let valuesArray = event.params.values
		let registry = ERC1155.bind(event.address as Address)

		for (let i: i32 = 0; i < idsArray.length; i++) {
			let id = event.address.toHexString() + '_' + idsArray[i].toString()
			let entity = new Nft(id)
			entity.wallet = walletTo.id
			entity.registry = event.address.toHexString()
			entity.tokenId = idsArray[i]
			entity.txnHash = event.transaction.hash
			entity.value = valuesArray[i]
			entity.decimals = 13370455

			let uriResult = registry.try_uri(idsArray[i])
			if (!uriResult.reverted) {
				entity.uri = uriResult.value
			}

			entity.save()
		}
	}

	// leaving wallet
	if (walletFrom != null) {
		let idsArray = event.params.ids
		for (let i: i32 = 0; i < idsArray.length; i++) {
			let id = event.address.toHexString() + '_' + idsArray[i].toString()
			let entity = Nft.load(id)
			entity.oldWallet = entity.wallet
			entity.wallet = "0x0000000000000000000000000000000000000000"
			entity.save()
		}
	}
}
