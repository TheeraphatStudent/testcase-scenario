import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [githubInfo, setGithubInfo] = useState<any>({});

  const fetchGithubInfo = async () => {
    const response = await fetch(import.meta.env.VITE_GITHUB_INFO, {
      method: 'GET'
    }).then(res => res.json())

    setGithubInfo(response)
  }

  const onReportIssue = () => {
    window.open('https://github.com/TheeraphatStudent/testcase-scenario/issues/new', '_blank')
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // console.log(documentHeight - scrollPosition)

      if (documentHeight - scrollPosition <= 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    fetchGithubInfo();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-fit">
      <div
        className={`fixed bottom-0 w-full bg-yellow-900 text-white transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between *:min-h-20 *:flex *:flex-col *:w-fit *:justify-between">
            <div>
              <h3 className="text-xl font-bold">TCM</h3>
              <p className="text-yellow-300">
                An testcase management service
              </p>
            </div>

            <div className='items-end justify-end'>
              <img src={githubInfo?.avatar_url} alt="github" className='w-10 h-10 rounded-full' />
              <span className='text-yellow-300'>{githubInfo?.name}</span>
            </div>
          </div>

          <div className="flex gap-12 mt-8 pt-8 border-t border-yellow-700 text-center text-yellow-300">
            <button onClick={onReportIssue} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-yellow-700 via-yellow-800 to-yellow-900 group-hover:from-yellow-600 group-hover:via-yellow-700 group-hover:to-yellow-800 dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-500">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-yellow-900 text-yellow-300 dark:bg-yellow-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent hover:text-white">
                รายงานปัญหา
              </span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-yellow-700 text-center text-yellow-300 hover:text-white">
            <a className='underline' href="https://github.com/TheeraphatStudent" target="_blank" rel="noopener noreferrer"> &copy; {new Date().getFullYear()} {githubInfo?.name ?? 'Theeraphat Student'}. All rights reserved.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
