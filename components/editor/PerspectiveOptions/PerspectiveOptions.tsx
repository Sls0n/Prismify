import { JoystickIcon, Rotate3d } from 'lucide-react'
import RotateOptions from './RotateOptions'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import { useImageOptions } from '@/store/use-image-options'

export default function PerspectiveOptions() {
  const { images, setImages, selectedImage } = useImageOptions()
  return (
    <div>
      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <Rotate3d size={20} />
        <span>Custom options</span>
      </h3>
      <RotateOptions />
      <hr className="my-8" />
      <h3 className="mb-6 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <JoystickIcon size={20} />
        <span>Or with a controller</span>
      </h3>
      <Joystick
        size={40}
        stickColor="#898aeb"
        baseColor="#898aeb40"
        move={(event: IJoystickUpdateEvent) => {
          const { type, x, y } = event
          if (type === 'move') {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateX: y! * 20,
                        rotateY: x! * 20,
                      },
                    }
                  : image
              )
            )
          }
        }}
      ></Joystick>
    </div>
  )
}
