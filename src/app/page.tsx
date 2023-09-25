import { ToDoItem } from '@/components/ToDoItem'
import { prisma } from '@/db'
import Image from 'next/image'
import Link from 'next/link'

function getToDo() {
  return prisma.toDo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.toDo.update({ where: { id }, data: { complete } })

  if (complete) {
    // Schedule the deletion after 7 days
    setTimeout(() => {
      deleteTodo(id);

    }, 604800000); // 7 days in milliseconds
  }
}

async function deleteTodo(id: string) {
  await prisma.toDo.delete({
    where: { id },
  });

}

export default async function Home() {
  const todos = await getToDo()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <header className='flex justify-between items-center mb-4'>
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-lg">
            ToDo App&nbsp;
            <code className="font-mono font-bold">by Satish Maharaj</code>
          </p>
          <Link href="/add" className='border border-slate-300 text-slate-300 px-2 py-1 
          rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none ml-auto z-10'>New</Link>
        </header>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center">
        {/* Background styling */}
        <div className="absolute top-0 left-0 h-[300px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-radial from-white to-transparent blur-2xl content-[''] dark:bg-gradient-to-br dark:from-transparent dark:to-blue-700 dark:opacity-10 lg:h-[360px] z-[-1]"></div>

        {/* Content */}
        <div className="relative">
          {todos.length === 0 ? (
            <p className="pl-5 text-lg">Nothing to do</p>
          ) : (
            <ul className="pl-5 space-y-2 text-lg">
              {todos.map((todo) => (
                <ToDoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
              ))}
            </ul>
          )}
        </div>
      </div>


      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://www.linkedin.com/in/satish-maharaj-549083235/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            LinkedIn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Satish Maharaj LinkedIn
          </p>
        </a>
        <a
          href="https://github.com/SatishLawrenceMaharaj"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Github{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Satish Maharaj Github
          </p>
        </a>
      </div>
    </main>
  )
}
