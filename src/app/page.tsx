import Image from 'next/image';

export default function HomePage() {
  return (
    <section className="size-screen overflow-hidden">
      <figure className="bg-background-tertiary px-5 py-3 rounded-br-xl flex items-center gap-2 w-fit">
        <Image
          src="/icon.svg"
          alt=""
          height={20}
          width={20}
          className="size-5 aspect-square"
        />
        <figcaption className="uppercase text-content-brand typo-label-large">
          Petshop
        </figcaption>
      </figure>

      <main className="container p-20 my-8">
        <header className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="typo-title text-content-primary">Sua agenda</h2>
            <p className="typo-paragraph-medium text-content-secondary">
              Aqui você pode ver todos os clientes e serviços agendados para
              hoje.
            </p>
          </div>
        </header>
      </main>
    </section>
  );
}
