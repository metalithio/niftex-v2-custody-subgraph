import {
	Address,
	log
} from "@graphprotocol/graph-ts"

import {
  NewInstance,
} from "../../generated/ShardedWalletFactory/ShardedWalletFactory"
import {
	Wallet
} from "../../generated/schema"
import {
	ShardedWallet
} from "../../generated/ShardedWalletFactory/ShardedWallet"

export function handleNewInstance(event: NewInstance): void {
	let entity = new Wallet(event.params.instance.toHex())

	let shardedWallet = ShardedWallet.bind(event.params.instance as Address)

	let symbol = shardedWallet.try_symbol()
	let governance = shardedWallet.try_governance()
	let name = shardedWallet.try_name()
	let owner = shardedWallet.try_owner()
	let artistWallet = shardedWallet.try_artistWallet()
	if (symbol.reverted) {
		log.warning("try_symbol reverted: {}", [event.params.instance.toHexString()])
	} else if (governance.reverted) {
		log.warning("try_governance reverted: {}", [event.params.instance.toHexString()])
	} else if (name.reverted) {
		log.warning("try_name reverted: {}", [event.params.instance.toHexString()])
	} else if (owner.reverted) {
		log.warning("try_owner reverted: {}", [event.params.instance.toHexString()])
	} else if (artistWallet.reverted) {
		log.warning("try_artistWallet reverted: {}", [event.params.instance.toHexString()])
	} else {
		entity.symbol = symbol.value
		entity.governance = governance.value.toHexString()
		entity.name = name.value
		entity.owner = owner.value.toHexString()
		entity.artistWallet = artistWallet.value.toHexString()
		entity.save()
	}
}
