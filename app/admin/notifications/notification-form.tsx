'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

export default function NotificationForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/admin/notify', { title, body })
    },
    onSuccess: () => {
      toast({ title: 'Notification sent' })
      setTitle('')
      setBody('')
    },
    onError: () => {
      toast({ title: 'Failed to send', variant: 'destructive' })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutate()
      }}
      className="space-y-4"
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <Button type="submit" isLoading={isLoading}>Send</Button>
    </form>
  )
}
