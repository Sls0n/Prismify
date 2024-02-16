import { useBackgroundOptions } from "@/store/use-background-options"

export default function UnsplashAttribute() {
  const {attribution} = useBackgroundOptions()

  return (
    <>
      {attribution.name !== null && (
        <div className="absolute bottom-2 right-4 rounded-md bg-[#151515] p-2 text-[0.85rem] text-dark/70 backdrop-blur-md ">
          Img by{' '}
          <a
            className="text-blue-500"
            href={`https://unsplash.com/@${attribution.link}?utm_source=Prismify&utm_medium=referral`}
          >
            {attribution.name}
          </a>{' '}
          on{' '}
          <a
            className="underline underline-offset-2"
            href="https://unsplash.com/?utm_source=Prismify&utm_medium=referral"
          >
            Unsplash
          </a>
        </div>
      )}
    </>
  )
}
