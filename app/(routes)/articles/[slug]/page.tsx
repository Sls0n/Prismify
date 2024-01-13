// @ts-nocheck

import { notFound } from 'next/navigation'
import { Text } from '@/components/ui/Text'
import BackButton from '@/components/ui/BackButton'
import {
  generateBadgeVariant,
  generateFormattedBlogDate,
  separateCommas,
} from '@/utils/helperFns'
import prismadb from '@/libs/prismadb'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Calendar } from 'lucide-react'

type ArticleProps = {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticleProps) {
  const blog = await prismadb.article.findFirst({
    where: {
      slug: params.slug,
    },
  })

  console.log(blog)

  if (!blog) {
    return notFound()
  }

  return (
    <section className="flex pt-[72px] w-full flex-col gap-8 lg:gap-16">
      <div className="container mt-8">
        <BackButton />
      </div>

      <article className="mx-auto h-fit w-full max-w-prose rounded-md px-8">
        <div className="mb-16 flex w-full items-start justify-between">
          <div className="flex flex-col gap-3">
            {/* Time published/updated */}
            <div className="flex items-center">
              <Calendar className="mr-2 h-[1.15rem] w-[1.15rem] text-white/40" />
              <time
                className="text-base font-normal text-dark/60"
                dateTime={
                  blog?.updatedAt.toISOString() ?? blog?.createdAt.toISOString()
                }
              >
                {generateFormattedBlogDate(blog?.createdAt, blog?.updatedAt)}
              </time>
            </div>

            {/* Title */}
            <Text
              variant="h1"
              bold
              className="line-clamp-2 text-[2rem] font-bold capitalize leading-tight text-dark md:text-[2.8rem]"
            >
              {blog.title ?? 'N/A'}
            </Text>
            {/* Cateogry */}
            {blog.category && (
              <div className="flex items-center gap-2">
                {separateCommas(blog.category).map((category) => (
                  <Badge
                    key={category}
                    variant={generateBadgeVariant(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="prose-md prose prose-neutral prose-p:tracking-[0.002em] mb-16 dark:prose-invert md:prose-lg prose-p:text-dark prose-img:rounded-md">
          {blog?.imageUrl && (
            <figure>
              <Image
                src={blog?.imageUrl ?? '/images/fallback.jpg'}
                alt={'cover image'}
                width={1280}
                height={720}
                priority
                className="aspect-auto object-cover"
              />

              {/* <figcaption>
              Picture
            </figcaption> */}
            </figure>
          )}
          {blog?.content?.content?.map((item, index) => {
            switch (item?.type) {
              // paragraph
              case 'paragraph':
                // if (!item.content || item.content.length === 0) {
                //   return <div className='py-0.5' key={index} />
                // }
                return (
                  <p key={index}>
                    {item?.content?.map((text, textIndex) => {
                      let className = ''
                      if (text.marks) {
                        className = text.marks
                          .map((mark) => {
                            switch (mark.type) {
                              case 'bold':
                                return 'font-bold'
                              case 'italic':
                                return 'italic'
                              case 'underline':
                                return 'underline'
                              case 'strike':
                                return 'line-through'
                              default:
                                return ''
                            }
                          })
                          .join(' ')
                      }
                      if (text?.marks?.[0]?.type === 'link') {
                        return (
                          <a
                            key={textIndex}
                            href={`${text?.marks?.[0]?.attrs?.href}?ref=prismify`}
                            target={text?.marks?.[0]?.attrs?.target}
                            className={className + ' prose-a'}
                          >
                            {text.text}
                          </a>
                        )
                      }
                      return className ? (
                        <span key={textIndex} className={className}>
                          {text.text}
                        </span>
                      ) : (
                        text.text || ''
                      )
                    })}
                  </p>
                )

              // heading
              case 'heading':
                return (
                  <h3 key={index} className="font-bold text-dark/90">
                    {item?.content?.map((text, textIndex) => {
                      let className = ''
                      if (text.marks) {
                        className = text.marks
                          .map((mark) => {
                            switch (mark.type) {
                              case 'bold':
                                return 'font-bold'
                              case 'italic':
                                return 'italic'
                              case 'underline':
                                return 'underline'
                              case 'strike':
                                return 'line-through'
                              default:
                                return ''
                            }
                          })
                          .join(' ')
                      }
                      return className ? (
                        <span
                          key={textIndex}
                          className={
                            className +
                            ' text-[1.4rem] font-bold md:text-2xl'
                          }
                        >
                          {text.text}
                        </span>
                      ) : (
                        text.text || ''
                      )
                    })}
                  </h3>
                )
              // image
              case 'image':
                return (
                  <figure key={index}>
                    <img
                      className="aspect-auto w-full max-w-full"
                      src={item.attrs.src}
                      alt={item.attrs.alt ?? 'image'}
                    />
                    {/* <ImageWithFallback
                      width={900}
                      height={600}
                      className="aspect-auto w-full max-w-full"
                      src={item.attrs.src}
                      alt={item.attrs.alt ?? 'image'}
                    /> */}
                  </figure>
                )
              // codeBlock
              case 'codeBlock':
                return (
                  <pre key={index}>
                    <code>{item?.content?.[0]?.text}</code>
                  </pre>
                )
              // blockquote
              case 'blockquote':
                return (
                  <blockquote key={index}>
                    {item?.content?.map((textItem, textIndex) => (
                      <p key={textIndex}>
                        {textItem?.content?.map((text, textIndex) => {
                          let className = ''
                          if (text?.marks) {
                            className = text?.marks
                              .map((mark) => {
                                switch (mark?.type) {
                                  case 'bold':
                                    return 'font-bold'
                                  case 'italic':
                                    return 'italic'
                                  case 'underline':
                                    return 'underline'
                                  case 'strike':
                                    return 'line-through'
                                  default:
                                    return ''
                                }
                              })
                              .join(' ')
                          }
                          return className ? (
                            <span key={textIndex} className={className}>
                              {text.text}
                            </span>
                          ) : (
                            text.text || ''
                          )
                        })}
                      </p>
                    ))}
                  </blockquote>
                )
              // orderedList
              case 'orderedList':
                return (
                  <ol key={index} start={item.attrs.start}>
                    {item?.content?.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>
                        {listItem?.content?.map((textItem, textIndex) => (
                          <p key={textIndex}>
                            {textItem?.content?.map((text, textIndex) => {
                              let className = ''
                              if (text.marks) {
                                className = text.marks
                                  .map((mark) => {
                                    switch (mark.type) {
                                      case 'bold':
                                        return 'font-bold'
                                      case 'italic':
                                        return 'italic'
                                      case 'underline':
                                        return 'underline'
                                      case 'strike':
                                        return 'line-through'
                                      default:
                                        return ''
                                    }
                                  })
                                  .join(' ')
                              }
                              return (
                                <span key={textIndex} className={className}>
                                  {text.text}
                                </span>
                              )
                            })}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ol>
                )
              // bulletList
              case 'bulletList':
                return (
                  <ul key={index}>
                    {item?.content?.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>
                        {listItem?.content?.map((textItem, textIndex) => (
                          <p key={textIndex}>
                            {textItem?.content?.map((text, textIndex) => {
                              let className = ''
                              if (text.marks) {
                                className = text.marks
                                  .map((mark) => {
                                    switch (mark.type) {
                                      case 'bold':
                                        return 'font-bold'
                                      case 'italic':
                                        return 'italic'
                                      case 'underline':
                                        return 'underline'
                                      case 'strike':
                                        return 'line-through'
                                      default:
                                        return ''
                                    }
                                  })
                                  .join(' ')
                              }
                              return (
                                <span key={textIndex} className={className}>
                                  {text.text}
                                </span>
                              )
                            })}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ul>
                )
              // horizontalRule
              case 'horizontalRule':
                return <hr key={index} />

              default:
                return null
            }
          })}
        </div>
      </article>
    </section>
  )
}
