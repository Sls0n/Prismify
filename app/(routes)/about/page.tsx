/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import BackButton from '@/components/ui/back-button'
import { Text } from '@/components/ui/text'
import type { Metadata } from 'next'
import Image from 'next/image'
import { GradientText } from '@/components/ui/gradient-text'

export const metadata: Metadata = {
  title: 'About - Prismify',
  description: 'Read details about Prismify.',
  openGraph: {
    title: 'About - Prismify',
    description: 'Read details about Prismify.',
  },
  alternates: {
    canonical: 'https://prismify.vercel.app/about',
  },
}

export default function page() {
  return (
    <section className="container flex w-full flex-col gap-8 pt-[72px] lg:gap-16">
      <div className="mt-8">
        <BackButton />
      </div>

      <article className="mx-auto h-fit w-full max-w-prose rounded-md">
        <div className="mb-16 flex w-full items-start justify-between">
          <div className="mx-auto flex flex-col gap-3">
            {/* Title */}
            <GradientText
              as="h1"
              variant="purple"
              className="line-clamp-2 border-b-[3px] border-[#898aeb] text-center text-[2rem] font-semibold capitalize leading-tight md:text-[2.8rem]"
            >
              <span className="!font-medium">About</span> &mdash; Prismify
            </GradientText>
          </div>
        </div>

        <div className="prose prose-lg prose-neutral mb-16 dark:prose-invert prose-p:tracking-[0.002em] prose-p:text-dark prose-img:rounded-lg">
          <figure className="">
            <Image
              width={1280}
              height={720}
              src="https://prismify.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5262c091-eb0d-485e-8fdc-7a16b54935b4%2F01b77d12-90a7-42a9-87b3-d43ebb33aca3%2Fprofile-4TcKvlK3c7c8cg1PP9gwBEJrYaY2-128shots_so..png?table=block&id=17227f20-3d4b-4256-a2a7-54f8949a03f7&spaceId=5262c091-eb0d-485e-8fdc-7a16b54935b4&width=2000&userId=&cache=v2"
              alt="About Prismify"
              className="aspect-auto max-w-full object-cover"
            />
          </figure>
          <p>
            Hey there, fellow entrepreneurs! Ever felt like banging your head
            against the wall trying to create eye-catching designs for your
            product or social media? I hear you! But guess what? Prismify's here
            to save the day.
          </p>{' '}
          <h3 className="text-dark">
            Let's dive into the struggles we all face:
          </h3>
          <ul>
            <li>
              <strong>Zero Design Skills:</strong> Who has time to become a
              design pro? With Prismify, you don't need to! It's like having a
              magic wand for your visuals.
            </li>
            <li>
              <strong>Clock's Ticking:</strong> Time is money, they say.
              Prismify respects that – swift, efficient, and no-nonsense design
              tools.
            </li>
            <li>
              <strong>Quality Matters:</strong> We all want our stuff to look
              top-notch. Prismify keeps your visuals sharp and professional
              without the designer price tag.
            </li>
          </ul>
          <p>
            Now, hold on to your hats! Here's how Prismify makes design a
            cakewalk:
          </p>
          <ul>
            <li>
              Browser Frame Mockups: Pop your product into a fancy browser frame
              in a snap!
            </li>
            <li>
              Custom Gradients: Gradient backgrounds that'll make your graphics
              pop like fireworks! With also adaptive gradients support!
            </li>
            <li>
              Text Tricks & Notes: Jazz up your visuals with text enhancements
              and handy annotations.
            </li>
            <li>
              Color Magic & 3D Vibes: Prismify's color game and 3D effects?
              Mind-blowing.
            </li>
            <li>
              Hi-Res & Lightning-Speed Edits: Get crisp, high-res images without
              the wait. Lightning-fast editing? You got it!
            </li>
          </ul>
          <p>Perks for You:</p>
          <ul>
            <li>
              Time Saver: Spend less time stressing over designs, more time
              making things happen.
            </li>
            <li>
              Pro-Level Designs: No more 'amateur hour' visuals. Prismify gives
              you that polished, pro look.
            </li>
            <li>
              Versatility Rules: Social media, websites, product shots –
              Prismify's got your back for any visual need.
            </li>
          </ul>
          <p>Feeling the design itch? Scratch it with Prismify!</p>
          <blockquote>
            "Transform Your Visuals Today! Try Prismify – Your Visual Upgrade
            Shortcut."
          </blockquote>
          <p>
            Wrapping it Up: Prismify's not just a tool; it's your secret weapon
            for killer SaaS visuals and social media. Remember to show, not just
            tell – demos and examples make all the difference. Get ready to rock
            those visuals!
          </p>
        </div>
      </article>
    </section>
  )
}
