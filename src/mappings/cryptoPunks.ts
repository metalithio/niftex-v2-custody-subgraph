import {
	// BigInt
} from "@graphprotocol/graph-ts"
import {
  PunkTransfer,
} from "../../generated/CryptoPunks/CryptoPunks"
import {
	Wallet,
	Nft
} from "../../generated/schema"

export function handlePunkTransfer(event: PunkTransfer): void {
	let walletTo = Wallet.load(event.params.to.toHex())
	let walletFrom = Wallet.load(event.params.from.toHex())

	let id = event.address.toHexString() + '_' + event.params.punkIndex.toString()

	// entering wallet
	if (walletTo !== null) {
		let entity = new Nft(id)
		entity.wallet = walletTo.id
		entity.registry = event.address.toHexString()
		entity.tokenId = event.params.punkIndex
		entity.txnHash = event.transaction.hash
		entity.name = "CRYPTOPUNKS"
		entity.symbol = "Ͼ"
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
