import {
	log,
	Address
} from "@graphprotocol/graph-ts"
import {
  Transfer,
} from "../../generated/GenericTransfers/TransferPermutations"
import {
	Wallet,
	Nft
} from "../../generated/schema"

export function handleTransfer(event: Transfer): void {

	// !WARNING punk rinkeby address
	// skip because it throws a useless Transfer event
	if (event.address.toHex() == "0xee321008dd7f9267cd5ea611da40d2d83e5fa15f") return

	let wallet = Wallet.load(event.params.to.toHex())

	if (wallet !== null) {
		let id = event.address.toHexString() + '_' + event.params.tokenId.toString()
		let entity = new Nft(id)
		entity.wallet = wallet.id
		entity.registry = event.address.toHexString()
		entity.tokenId = event.params.tokenId
		entity.txnHash = event.transaction.hash
		entity.save()
	}
}
