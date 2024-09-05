export class Device {
  constructor(
    public deviceId: number,
    public deviceName: string,
    public deviceModel: string,
    public createdAt: string,
    public updatedAt: string,
    public isOn: boolean,
    public media: string,
    public location: string,
    public status: string,
    public sensors: any,
    public actuators: any,
  ) {}
}
