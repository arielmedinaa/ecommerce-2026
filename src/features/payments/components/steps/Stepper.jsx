import { FaCheck } from 'react-icons/fa'

const Stepper = ({ step }) => (
    <div className="flex items-center justify-between mb-8 font-poppins">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-400 bg-opacity-30 flex items-center justify-center">
                <FaCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xs md:text-sm text-white opacity-90">Información</span>
        </div>

        <div className="flex-1 h-0.5 bg-white bg-opacity-30 mx-2 md:mx-4"></div>

        <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-semibold">2</span>
            </div>
            <span className="text-xs md:text-sm text-white font-semibold">Pagos</span>
        </div>

        <div className="flex-1 h-0.5 bg-white bg-opacity-30 mx-2 md:mx-4"></div>

        <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white border-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-semibold opacity-70">3</span>
            </div>
        </div>
    </div>
);

export default Stepper