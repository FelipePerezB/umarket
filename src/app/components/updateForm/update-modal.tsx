'use client'
import SearchModal from '@/components/ui/modal/search-modal'
import React from 'react'
import UpdateForm from './updateForm'
import { useSearchParams } from 'next/navigation'
import Options from '@/components/navigation/options'

export default function UpdateModal() {
  const searchParams = useSearchParams()
  const id = "post"
  const opt = (searchParams.get('opt')) ?? "products"
  const modal = searchParams.get("modal") ?? "";
  return (
    <SearchModal
      searchParams={{ modal }}
      id={id}
      title={`Publicar ${opt === "products" ? "producto" : "anuncio"}`}
      closeWithBlur={false}
    >
      <Options
        currentOption={opt}
        options={[
          { opt: "Producto", url: "?modal=post", id: "products" },
          { opt: "Anuncio", url: "?modal=post&opt=announcements" , id: "announcements" },
        ]}
      />
      <UpdateForm
        searchParams={{ opt }}
      />
    </SearchModal>
  )
}

