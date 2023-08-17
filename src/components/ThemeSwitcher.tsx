import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import { type UseThemeProps } from 'next-themes/dist/types';
import { Fragment, type FC } from 'react'

const ThemeSwitcher: FC = ({ }) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const { theme, setTheme }: UseThemeProps = useTheme();

	return (<div className='right-0 mx-2 h-full flex items-center'>
		{
			theme == "light" ? (
				<button onClick={() => setTheme("dark")}>
					<Icon icon="tabler:moon" className="w-6 h-6" />
				</button>
			) : (
				<button onClick={() => setTheme("light")}>
					<Icon icon="tabler:sun" className="w-6 h-6" />
				</button>
			)
		}
	</div>);
}

export default ThemeSwitcher;