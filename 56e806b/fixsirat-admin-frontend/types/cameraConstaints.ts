export default interface cameraConstraints {
    video : {
      width:{
        ideal: number
      },
      height:{
        ideal: number
      },
      facingMode: string
    }
    audio: boolean
  }
