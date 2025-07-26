import GithubIcon from '../svg/github-logo.svg?react';

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-100 border-t border-gray-100 text-center p-2">
      <div className="flex justify-center items-center">
        <a
          href="https://github.com/cmgchess/fide-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2"
        >
          <GithubIcon className="w-6 h-6 text-black" />
        </a>
        <p className="text-black">GitHub Repository</p>
      </div>
    </footer>
  );
}

export default Footer;
