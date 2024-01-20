import { JoystickIcon, Rotate3d } from 'lucide-react'
import RotateOptions from './rotate-options'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'

export default function PerspectiveOptions() {
  const { images, setImages } = useImageOptions()
   const { selectedImage } = useSelectedLayers()
  const { setShowControls } = useMoveable()

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
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
            setShowControls(false)
            selectedImage &&
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
          } else if (type === 'stop') {
            setShowControls(true)
          }
        }}
      ></Joystick>
    </div>
  )
}
