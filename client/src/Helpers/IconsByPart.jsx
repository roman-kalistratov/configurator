import {
  BsCpu,
  BsThermometerSun,
  BsMotherboard,
  BsMemory,
  BsGpuCard,
  BsDeviceSsd,
  BsDeviceHdd,
  BsPciCardSound,
  BsEthernet,
  BsPc,
  BsKeyboard,
  BsMouse,
  BsHeadset,
  BsWebcam,
  BsPrinter,
  BsInfoCircle,
} from 'react-icons/bs';

import { GiComputerFan } from 'react-icons/gi';
import { RiHardDriveFill } from 'react-icons/ri';
import { ImPower } from 'react-icons/im';
import { GiGameConsole } from 'react-icons/gi';
import { TbDeviceIpadFilled } from 'react-icons/tb';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { MdOutlineMonitor, MdCable, MdOutlineSecurity } from 'react-icons/md';
import { FaWindows } from 'react-icons/fa';
import { SiLibreoffice } from 'react-icons/si';
import { GrInstall } from 'react-icons/gr';

const iconMap = {
  289: BsCpu, // CPU
  290: BsThermometerSun, // CPU Cooler
  291: BsMotherboard, // Motherboard
  292: BsMemory, // RAM
  293: BsGpuCard, // GPU 1
  18936: BsGpuCard, // GPU 2
  18937: BsGpuCard, // GPU 3
  1310: BsDeviceSsd, // SSD 1
  18938: BsDeviceSsd, // SSD 2
  19140: BsDeviceSsd, // SSD 3
  7669: BsDeviceHdd, // HDD 1
  18939: BsDeviceHdd, // HDD 2
  19139: BsDeviceHdd, // HDD 3
  295: RiHardDriveFill, // Optical writer
  296: BsPciCardSound, // Sound card
  297: BsEthernet, // Net device
  18943: BsEthernet, // Net device
  298: ImPower, // Power Suply
  299: BsPc, // Case
  300: GiComputerFan, // Fans, Coolers, Accessories
  17297: GiComputerFan, // Fans, Coolers, Accessories
  17298: GiComputerFan, // Fans, Coolers, Accessories
  301: BsKeyboard, // Keyboard
  302: BsMouse, // Mouse
  19752: GiGameConsole, // Game pads
  975: TbDeviceIpadFilled, // Mouse pads
  303: HiOutlineSpeakerWave, // Speakers
  19753: BsHeadset, // Speakers
  304: MdOutlineMonitor, // Monitor
  21766: MdOutlineMonitor, // Monitor
  17294: MdCable, // Cables
  17295: MdCable, // Cables
  17296: MdCable, // Cables
  8251: FaWindows, // Operating Systems
  8252: SiLibreoffice, // Office
  8253: MdOutlineSecurity, // Antivirus, Security
  4632: BsWebcam, // Web Camera
  4634: BsPrinter, // Printer
  11047: GrInstall, // assembly
};

const IconsByPart = ({ partIdnt, size = 22, color = 'inherit' }) => {
  const IconComponent = iconMap[Number(partIdnt)] || BsInfoCircle;

  return <IconComponent size={size} color={color} />;
};

export default IconsByPart;
