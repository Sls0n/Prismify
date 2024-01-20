import Image from 'next/image'
import Link from 'next/link'

type ArticleCardProps = {
  title: string
  category: string
  image: string
  date: string
  href: string
}

export default function ArticleCard({
  title,
  image,
  date,
  category,
  href,
}: ArticleCardProps) {
  return (
    <div className="group flex flex-col items-center text-dark">
      <Link href={href} className="h-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="aspect-[4/3] h-full w-full object-cover object-center transition-all will-change-auto duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex w-full flex-col">
        <span className="text-xs font-semibold uppercase text-purple sm:text-sm">
          {category}
        </span>
        <Link href={href} className="my-1.5 inline-block">
          <h2 className="line-clamp-2 text-base font-semibold capitalize text-dark sm:text-lg">
            {title}
          </h2>
        </Link>

        <span className="dark:text-light/50 max-w-xs text-sm font-medium capitalize text-dark/60  sm:text-base">
          {date}
        </span>
      </div>
    </div>
  )
}
