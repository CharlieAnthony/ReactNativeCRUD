import countryside from '../../assets/images/placeholders/countryside.png';
import stream from '../../assets/images/placeholders/stream.png';
import autumn from '../../assets/images/placeholders/autumn.png';
import beach from '../../assets/images/placeholders/beach.png';
import desert from '../../assets/images/placeholders/desert.png';
import forrest from '../../assets/images/placeholders/forrest.png';
import landscape from '../../assets/images/placeholders/landscape.png';
import mountains from '../../assets/images/placeholders/mountains.png';

const imgIds2Paths: Record<number, any> = {
	0: countryside,
	1: stream,
	2: autumn,
	3: beach,
	4: desert,
	5: forrest,
	6: landscape,
	7: mountains,
};

export const getImageById = (id: number) => {
	const img = imgIds2Paths[id];
	if (!img) throw new Error(`No image found for id ${id}`);
	return img;
};
