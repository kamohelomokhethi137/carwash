import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';

const RegisterCarForm = ({ formData, handleInputChange, handleSubmit }) => {
  const { enqueueSnackbar } = useSnackbar();

  const fields = [
    { name: 'ownerName', label: 'Owner Name' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'plateNumber', label: 'Plate Number' },
    { name: 'carName', label: 'Car Name' },
    { name: 'make', label: 'Make' },
    { name: 'model', label: 'Model' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/30 backdrop-blur-md border border-gray-300 shadow-2xl rounded-2xl p-10 max-w-3xl mx-auto mt-12"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-black mb-10 text-center"
      >
        Register New Car
      </motion.h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {fields.map(({ name, label }) => (
            <div key={name} className="relative">
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="peer w-full border border-gray-300 text-sm rounded-lg px-4 pt-5 pb-2 text-black bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder={label}
                required
              />
              <label
                htmlFor={name}
                className="absolute text-gray-700 left-4 top-3 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                {label}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px #3b82f6',
            }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full overflow-hidden transition hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
              animate={{ x: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 13h2l1 5h12l1-5h2M5 13l1.5-6h11L19 13M9 18h.01M15 18h.01"
              />
            </motion.svg>
            Register Car
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterCarForm;
