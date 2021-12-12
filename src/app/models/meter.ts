export interface meter {
    meterId: string
    meterWater: number
    meterPower: number
    meterPreviousWater: number
    meterPreviousPower: number
    meterUnitWater: number
    meterUnitPower: number
    meterStatus: string
    selectMonth: Date
    roomId: string
    status: string
}