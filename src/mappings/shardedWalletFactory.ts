import {
	Address,
	log
} from "@graphprotocol/graph-ts"

import {
  NewInstance,
} from "../../generated/ShardedWalletFactory/ShardedWalletFactory"
import {
	ShardedWallet as ShardedWalletTemplate
} from "../../generated/templates"
import {
	ShardedWallet as ShardedWalletSchema
} from "../../generated/schema"
import {
	ShardedWallet
} from "../../generated/templates/ShardedWallet/ShardedWallet"

export function handleNewInstance(event: NewInstance): void {
	ShardedWalletTemplate.create(event.params.instance)
	let entity = ShardedWalletSchema.load(event.params.instance.toHex())
	if (entity) {
		let shardedWallet = ShardedWallet.bind(event.params.instance as Address)
		let result = shardedWallet.try_symbol()
		if (result.reverted) {
			log.warning("try_symbol reverted: {}", [event.params.instance.toHexString()])
		} else {
			entity.symbol = result.value
			entity.save()
		}
	} else {
		log.warning("no sw found: {}", [event.params.instance.toHexString()])
	}
}
