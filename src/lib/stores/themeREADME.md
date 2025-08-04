rename stores/ to themes/
update themes page to search for right folder

goal:
    - each theme should be its own separate .json

in each .json it will be these colors

beach.json
{
    primary: #hex main accent color of the page, maily the logo and the reading bar
    primary-variant: #hex a variant of primary for the logo and the top bar to change to
    secondary: #hex a complementary color to primary
    background: #hex 
    background-variant: # darker or lighter version of the background in menu boxes and reading bar
    text: #
    text-variant: # for text that requires an accent
}

Javascript (In layout.svelte) reads in current theme and searches corresponding json file.
Css variables are set using javascript.
    element.style.setProperty('--primary-color', currentTheme.primary);

HTML can now use those colors.

replace data-theme method
