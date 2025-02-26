import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 flex flex-col md:flex-row items-center justify-center gap-6 mt-auto">
      <p className="flex items-center gap-2">
        ©Weedmax - 2025
      </p>
      <a
        className="flex items-center gap-2 hover:text-blue-600 transition"
        href="/legacy"
      >
        <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
        Mentions légales
      </a>
      <a
        className="flex items-center gap-2 hover:text-blue-600 transition"
        href="https://boucletflorian.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/florian_bouclet.png"
          alt="Logo Florian Bouclet, développeur du site"
          width={20}
          height={20}
        />
        Créé par Bouclet Florian
      </a>
    </footer>
  );
}
