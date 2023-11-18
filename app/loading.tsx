'use client'

export default function loading() {
  return (
    <div className="h-full bg-primary text-primary dark:bg-dark dark:text-dark ">
      <div className="flex h-full flex-col">
        <header className="fixed inset-x-0 top-0 z-[10] flex h-[3.75rem] items-center border-b border-border bg-[#131313] px-4 py-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div className="ml-3 inline-flex h-8 w-40 animate-pulse items-center rounded-md bg-[#191919]" />
            </div>
            <div className="flex items-center">
              <div className="ml-3 inline-flex h-9 w-24 animate-pulse items-center rounded-xl bg-[#191919]" />
            </div>
          </div>
        </header>

        <main className="flex h-full pt-3 sm:flex-row">
          <aside className="flex w-[5rem] overflow-x-hidden border-r border-border  md:w-[30rem]">
            <ul className="relative flex basis-[100%] flex-col items-center gap-6 overflow-y-auto overflow-x-hidden border-border bg-secondaryLight px-4 py-8 dark:border-[#22262b]/60 dark:bg-[#131313] md:max-w-[25%] md:basis-[25%] md:border-r">
              {[1, 2, 3, 4, 5, 6, 7].map((button, index) => (
                <li
                  key={index}
                  className={`click-ignored relative flex flex-col items-center gap-2 `}
                >
                  <div
                    className={`h-11 w-[3.3rem] animate-pulse rounded-xl border border-[#222]/70 bg-[#191919] px-3 py-2 md:h-12 md:px-4 md:py-3`}
                  />
                  <div className="hidden h-4 w-[3.25rem] animate-pulse rounded-md bg-[#191919] md:block" />
                </li>
              ))}
            </ul>
            <div className="relative hidden h-full w-full flex-col overflow-hidden dark:bg-[#151515] md:flex">
              <div className="flex flex-col overflow-y-hidden px-7">
                <div className="flex w-full flex-col py-12">
                  <div className="mb-8 flex items-center gap-2">
                    <div className="flex h-[1.6rem] w-36 gap-3">
                      <div className="h-full w-[20%] animate-pulse rounded-md bg-[#191919]" />
                      <div className="h-full w-full flex-1 animate-pulse rounded-md bg-[#191919]" />
                    </div>

                    <div className="ml-auto mr-1 flex h-[1.6rem] w-20 gap-2.5">
                      <div className="h-full flex-1 animate-pulse rounded-md bg-[#191919]" />
                      <div className="h-full w-full flex-1 animate-pulse rounded-md bg-[#191919]" />
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col ">
                  <div className="[&:*]:animate-pulse mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3 ">
                    <div className="flex h-[1.2rem] w-28 rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>

                  <div className="mb-8 flex flex-col gap-3">
                    <div className="flex h-[1.2rem] w-28 animate-pulse rounded-md bg-[#191919]" />
                    <div className="flex h-[1.2rem] w-full max-w-[70%] animate-pulse rounded-md bg-[#191919]" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <section className="relative flex h-full flex-1 items-start justify-center overflow-hidden bg-[#111] px-6 py-4 pt-5">
            <div className="relative flex h-full w-full flex-col items-center justify-start gap-8 overflow-hidden">
              <div className="h-[87%] w-full items-center justify-center overflow-hidden rounded-md bg-[#141414] md:max-h-full" />
              <div className="h-full w-1/2 flex-1 rounded-lg bg-[#141414]" />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
