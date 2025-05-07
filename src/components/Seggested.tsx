import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

interface SeggestedProps {
  onClose?: () => void;
}

export const Seggested = ({ onClose }: SeggestedProps) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-sm mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-yellow-700 border-2 border-yellow-500 rounded-lg p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h3 className="font-bold text-white text-xl">สวัสดีครับทุกโคนนนนนน</h3>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="text-yellow-400 hover:text-white p-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close notification"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
              </div>

              <div className="space-y-4">
                <p className="text-yellow-300 text-lg flex flex-col">
                  หากพบเจอปัญหาระหว่างการใช้งาน เลื่อนลงไปแล้วกดรายงานปัญหาได้เลยงับบ
                </p>

                <motion.button
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-yellow-700 rounded-lg group bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-200 group-hover:from-yellow-200 group-hover:via-yellow-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-xl font-bold text-yellow-700 rounded-md group-hover:bg-transparent group-hover:text-white w-full">
                    เริ่มต้นใช้งาน
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
