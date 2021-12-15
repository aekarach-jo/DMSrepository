export interface bill {
    billId : string
    roomRate : number
    meterWater: number
    meterPower: number
    meterPreviousWater: number
    meterPreviousPower: number
    meterUnitWater: number
    meterUnitPower: number
    centerService: string
    roomId: string
    userId: string
    totalPrice: string
    status: string
    billStatus: string
}