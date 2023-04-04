import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../../lib/prisma'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'


interface Notes{
  notes: {
    id: string
    title: string
    content: string
  }[]
}

interface FormData {
  title: string
  content: string
  id: string
}

const Home = ({notes, userId}: Notes) => {
  const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }
  

  let data = {
    username: "",
    password: "",
  };

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("usertoken");

    if (!item) {
      router.push("/index");
      return;
    }
    
    var token2 = item.split(" ")[1];
    console.log(token2);
    // invalid token - synchronous
    try {
      var data_token = jwt.verify(token2, 'bangmessi');

      if ( !(data_token['id'] == userId['konsol'])){

        return (<div><h1> Anda Tidak Terotorisasi mengakses halaman ini chuuaks </h1></div>);
      }
    } catch(err) {

      return (<div><h1> Token Tidak Valid  </h1></div>);
  // err
    }
    
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
        if(data.id) {
          deleteNote(data.id)
          setForm({title: '', content: '', id: ''})
          refreshData()
        } else {
          setForm({title: '', content: '', id: ''})
          refreshData()
        }
      }
        )
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteNote(id: string) {
    try {
     fetch(`http://localhost:3000/api/note/${id}`, {
       headers: {
         "Content-Type": "application/json",
       },
       method: 'DELETE'
     }).then(() => {
       refreshData()
     })
    } catch (error) {
     console.log(error); 
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      console.log(data);
      data = {...data, userId: data_token["id"]};
      console.log(data);
     create(data) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>

      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Todos App</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1 className="text-center font-bold text-2xl mt-4 mb-2">Buat Daftar Kegiatan</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleSubmit(form)
      }} className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
        <input type="text"
          placeholder="Judul"
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea 
          placeholder="Daftar Kegiatan"
          value={form.content}
          onChange={e => setForm({...form, content: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white rounded p-1">Tambahkan</button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes.map(note => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-sm">{note.content}</p>
                </div>
                <button onClick={() => setForm({title: note.title, content: note.content, id: note.id})} className="bg-blue-500 hover:bg-blue-400 mr-3 px-3 text-white rounded">Edit</button>
                <button onClick={() => deleteNote(note.id)} className="bg-red-500 hover:bg-red-400 px-3 text-white rounded">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (context) => {
  // konsol/[id]/notes
  // console.log(context.params)
  // 2/notes
  // verify token jwt, jika url 2 dan user id di jwt sama maka bisa membuka web
  
  const userId  = context.params
  console.log(userId['konsol']);
  console.log("AADBABD");

  


  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true
    },
    where : {
      userId:  Number(userId['konsol'])
    }
  })

  return {
    props: {
      notes,
      userId
    }
  }
}