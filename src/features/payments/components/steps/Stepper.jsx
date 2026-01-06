import { FaCheck } from 'react-icons/fa'

const Stepper = ({ step }) => (
    <div className="flex items-center justify-between mb-8 font-poppins">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-2 bg-opacity-30 flex items-center justify-center">
                <FaCheck className="w-5 h-5 md:w-6 md:h-6 text-color-orange-2" />
            </div>
            <span className="text-xs md:text-xl text-color-orange-1 opacity-90">Información</span>
        </div>

        <div className="flex-1 h-0.5 bg-orange-2 bg-opacity-30 mx-2 md:mx-4"></div>

        <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-200 flex items-center justify-center">
                <span className="text-color-orange-1 text-lg md:text-xl font-semibold">2</span>
            </div>
            <span className="text-2xl md:text-xl text-color-orange-1">Pagos</span>
        </div>

        <div className="flex-1 h-0.5 bg-orange-2 bg-opacity-30 mx-2 md:mx-4"></div>

        <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-200 flex items-center justify-center">
                <span className="text-color-orange-1 text-lg md:text-xl font-semibold">3</span>
            </div>
            <span className="text-2xl md:text-xl text-color-orange-1">Confirmación</span>
        </div>
    </div>
);

export default Stepper