import {
	// BigInt
} from "@graphprotocol/graph-ts"
import {
  CryptoPunks,
  // Assign,
  // Transfer,
  PunkTransfer,
  // PunkOffered,
  // PunkBidEntered,
  // PunkBidWithdrawn,
  // PunkBought,
  // PunkNoLongerForSale
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
		entity.save()
	}

}

// export function handleAssign(event: Assign): void {}
//
// export function handleTransfer(event: Transfer): void {}
//
// export function handlePunkOffered(event: PunkOffered): void {}
//
// export function handlePunkBidEntered(event: PunkBidEntered): void {}
//
// export function handlePunkBidWithdrawn(event: PunkBidWithdrawn): void {}
//
// export function handlePunkBought(event: PunkBought): void {}
//
// export function handlePunkNoLongerForSale(event: PunkNoLongerForSale): void {}
