export interface Device {
  deviceId: number,
  deviceName: string,
  deviceModel: string,
  createdAt: string,
  updatedAt: string,
  isOn: boolean,
  media: string,
  location: string,
  status: string,
  sensors: any,
  actuators: any
}
