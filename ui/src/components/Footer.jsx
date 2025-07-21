import githubLogo from '../svg/github-logo.svg';

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
          <img src={githubLogo} alt="GitHub logo" />
        </a>
        <p className="text-black">GitHub Repository</p>
      </div>
    </footer>
  );
}

export default Footer;
