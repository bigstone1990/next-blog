'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

export default function SearchBox() {
  const [search, setSearch] = useState('')
  const [deboundedSearch, setDebounncedSearch] = useState('')
  const router = useRouter()

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounncedSearch(search)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    if (deboundedSearch.trim()) {
      router.push(`/?search=${deboundedSearch.trim()}`)
    } else {
      router.push('/')
    }
  }, [deboundedSearch, router])
  return (
    <>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="記事を検索..." className="bg-white w-[200px] lg:w-[300px]" />
    </>
  )
}
