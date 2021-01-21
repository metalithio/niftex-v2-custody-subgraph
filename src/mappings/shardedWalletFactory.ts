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

	let result = shardedWallet.try_symbol()
	if (result.reverted) {
		log.warning("try_symbol reverted: {}", [event.params.instance.toHexString()])
	} else {
		entity.symbol = result.value
		entity.save()
	}
}
