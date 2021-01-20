// import {
// 	Address,
// 	log
// } from "@graphprotocol/graph-ts"
// import {
// 	Received,
// } from "../../generated/ShardedWallet/ShardedWallet"
// import {
// 	Received as ReceivedTemplate,
// } from "../../generated/schema"
// import {
// 	ShardedWallet
// } from "../../generated/ShardedWallet/ShardedWallet"
//
// export function handleReceived(event: Received): void {
// 	let entity = ReceivedTemplate.load(event.params.data.toString())
//
// 	if (entity == null) {
// 		let entity = new ReceivedTemplate(event.params.data.toString())
// 		entity.save()
// 	}
//
// 	let shardedWallet = ShardedWallet.bind(event.address as Address)
//
// 	let result = shardedWallet.try_symbol()
// 		log.warning("try_symbol: {}", [result.value])
//
// }
