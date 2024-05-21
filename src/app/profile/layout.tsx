export default async function ProfilePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section>
        <div>
          <div className="w-5 h-5 rounded-full">IMG</div>
          <div className="">Nombre Apellido</div>
          <div className="">Contacto: email o whatsapp</div>
          <div className="">Ubicación: </div>
          <div className="">Mas opciones </div>
          <div className="">Estrellas? </div>
        </div>
      </section>
      <section>{children}</section>
    </>
  );
}
