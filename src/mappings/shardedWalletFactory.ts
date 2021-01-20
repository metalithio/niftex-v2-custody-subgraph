import {
  NewInstance,
} from "../generated/CryptoPunks/CryptoPunks"
import { ShardedWallet } from "../generated/templates"

export function handleNewInstance(event: NewInstance): void {
	let shardedWallet = ShardedWallet.create(event.params.instance)
	let result = shardedWallet.try_symbol()
	if (result.reverted) {

	} else {
		shardedWallet.symbol = result.value
		shardedWallet.save()
	}
}
