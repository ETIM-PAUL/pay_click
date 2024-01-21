import { AccountCreated as AccountCreatedEvent } from "../generated/payclick/payclick"
import { tokenDeposit as TokenDepositEvent } from "../generated/templates/payclickDashboard/payclickdashboard"
import { withdrawToken as WithdrawTokenEvent } from "../generated/templates/payclickDashboard/payclickdashboard"
import { AllAttendance as AllAttendanceevent } from "../generated/templates/payclickDashboard/payclickdashboard"
import { AmountPaidout as AmountPaidoutevent } from "../generated/templates/payclickDashboard/payclickdashboard"
import { bestStaff as BeststaffEvent } from "../generated/templates/payclickDashboard/payclickdashboard"
import { AccountCreated, tokenDeposit,withdrawToken,AllAttendance,AmountPaidout,bestStaff} from "../generated/schema"
import {payclickDashboard} from "../generated/templates"

export function handleAccountCreated(event: AccountCreatedEvent): void {
  let entity = new AccountCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity._child = event.params._child

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  payclickDashboard.create(event.params._child)

  entity.save()
}


export function handleTokenDeposit(event: TokenDepositEvent): void {
    let entity = new tokenDeposit(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity._contract = event.params._contract
    entity._amount = event.params._amount
    entity.time = event.params.time
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
} 
export function handleWithdrawToken(event: WithdrawTokenEvent): void {
  let entity = new withdrawToken(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity._contract = event.params._contract  
  entity._amount = event.params._amount
  entity.receiver = event.params.receiver
  entity.time = event.params.time
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
} 

export function handleAttendance(event: AllAttendanceevent): void {
  let entity = new AllAttendance(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity._contract = event.params._contract  
  entity._staff = event.params._staff
  entity.name = event.params.name
  entity.position = event.params.position
  entity.email = event.params.email
  entity._time = event.params._time
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
} 
export function handleAmountpaidOut(event: AmountPaidoutevent): void {
  let entity = new AmountPaidout(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity._contract = event.params._contract  
  entity.amount = event.params.amount
  entity.timePaid = event.params.timePaid
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
} 
export function handleBestStaff(event: BeststaffEvent): void {
  let entity = new bestStaff(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity._contract = event.params._contract  
  entity.name = (event.params.name).toString()
  entity.bestStaff = event.params.bestStaff
  entity.nftId = event.params.nftId
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
} 


