import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';

const RegisterCarForm = ({ formData, handleInputChange, handleSubmit }) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Register New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['ownerName', 'phoneNumber', 'plateNumber', 'carName', 'make', 'model'].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-black mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Register Car
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterCarForm;