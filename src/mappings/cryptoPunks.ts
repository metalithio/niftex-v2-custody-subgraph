import { BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/CryptoPunks/CryptoPunks"
import {
	ShardedWallet,
	Nft
} from "../generated/schema"

export function handlePunkTransfer(event: PunkTransfer): void {
	let entity = ShardedWallet.load(event.params.to.toHex())

	if (entity !== null) {
		let id = `${event.address}_${event.params.punkIndex}`
		entity = new Nft(id.toHex())
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
