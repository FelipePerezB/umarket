export default function getImageUrl(id: string){
  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/images/${id}`
}