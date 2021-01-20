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
	ShardedWallet,
	Nft
} from "../../generated/schema"

export function handlePunkTransfer(event: PunkTransfer): void {
	let swEntity = ShardedWallet.load(event.params.to.toHex())

	if (swEntity !== null) {
		let id = `${event.address}_${event.params.punkIndex}`
		let entity = new Nft(id)
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
