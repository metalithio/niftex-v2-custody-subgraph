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
	let wallet = Wallet.load(event.params.to.toHex())

	if (wallet !== null) {
		let id = event.address.toHexString() + '_' + event.params.punkIndex.toString()
		let entity = new Nft(id)
		entity.wallet = wallet.id
		entity.registry = event.address.toHexString()
		entity.tokenId = event.params.punkIndex
		entity.txnHash = event.transaction.hash
		entity.name = "CRYPTOPUNKS"
		entity.symbol = "Ͼ"
		entity.save()
	}
}
