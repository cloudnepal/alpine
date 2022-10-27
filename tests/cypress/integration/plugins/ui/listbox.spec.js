import { beVisible, haveAttribute, haveClasses, haveText, html, notBeVisible, notHaveAttribute, notExist, haveFocus, test } from '../../../utils'

test('it works with x-model',
    [html`
        <div
            x-data="{ active: null, people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb' },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
            x-model="active"
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="active ? active.name : 'Select Person'"></button>

            <ul x-listbox:options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person"
                        :disabled="person.disabled"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('ul').should(notBeVisible())
        get('button')
            .should(haveText('Select Person'))
            .click()
        get('ul').should(beVisible())
        get('button').click()
        get('ul').should(notBeVisible())
        get('button').click()
        get('[option="2"]').click()
        get('ul').should(notBeVisible())
        get('button').should(haveText('Arlene Mccoy'))
    },
)

test('it works with internal state',
    [html`
        <div
            x-data="{ people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb' },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="$listbox.selected ? $listbox.selected.name : 'Select Person'"></button>

            <ul x-listbox:options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person"
                        :disabled="person.disabled"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('ul').should(notBeVisible())
        get('button')
            .should(haveText('Select Person'))
            .click()
        get('ul').should(beVisible())
        get('button').click()
        get('ul').should(notBeVisible())
        get('button').click()
        get('[option="2"]').click()
        get('ul').should(notBeVisible())
        get('button').should(haveText('Arlene Mccoy'))
    },
)

// @todo fix $listboxOption.isDisabled
test('$listbox/$listboxOption',
    [html`
        <div
            x-data="{ people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb' },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="$listbox.selected ? $listbox.selected.name : 'Select Person'"></button>

            <article x-text="$listbox.active?.name"></article>

            <ul x-listbox:options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                            'disabled': $listboxOption.isDisabled,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('article').should(haveText(''))
        get('[option="5"]').should(haveClasses(['disabled']))
        get('button')
            .should(haveText('Select Person'))
            .click()
        get('article').should(haveText('Wade Cooper'))
        get('[option="1"]').should(haveClasses(['active']))
        get('ul').type('{downarrow}')
        get('article').should(haveText('Arlene Mccoy'))
        get('[option="2"]').should(haveClasses(['active']))
        get('button').should(haveText('Select Person'))
        get('[option="2"]').click()
        get('button').should(haveText('Arlene Mccoy'))
        get('[option="2"]').should(haveClasses(['selected']))
    },
)

// @todo support "name" prop
test('"name" prop',
    [html`
        <div
            x-data="{ people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb' },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
            name="person"
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="$listbox.selected ? $listbox.selected : 'Select Person'"></button>

            <ul x-listbox:options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person.id"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('input').should(notExist())
        get('input').should(beHidden())
            .should(haveAttribute('name', 'person'))
            .should(haveAttribute('value', '2'))
            .should(haveAttribute('type', 'hidden'))
        get('[option="2"]').click()
        get('[option="4"]').click()
        get('input').should(beHidden())
            .should(haveAttribute('name', 'person'))
            .should(haveAttribute('value', '4'))
            .should(haveAttribute('type', 'hidden'))
    },
);

// @todo support "default-value" prop
test('"default-value" prop',
    [html`
        <div
            x-data="{ people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb' },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
            name="person"
            default-value="2"
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="$listbox.selected ? $listbox.selected : 'Select Person'"></button>

            <ul x-listbox:options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person.id"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('input').should(beHidden())
            .should(haveAttribute('name', 'person'))
            .should(haveAttribute('value', '2'))
            .should(haveAttribute('type', 'hidden'))
    },
);

// @todo support "multiple" prop
test('"multiple" prop',
    [html`
        <div
            x-data="{
                value: [],
                people: [
                    { id: 1, name: 'Wade Cooper' },
                    { id: 2, name: 'Arlene Mccoy' },
                    { id: 3, name: 'Devon Webb' },
                    { id: 4, name: 'Tom Cook' },
                    { id: 5, name: 'Tanya Fox', disabled: true },
                    { id: 6, name: 'Hellen Schmidt' },
                    { id: 7, name: 'Caroline Schultz' },
                    { id: 8, name: 'Mason Heaney' },
                    { id: 9, name: 'Claudie Smitham' },
                    { id: 10, name: 'Emil Schaefer' },
                ]
            }"
            x-listbox
            multiple
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="$listbox.selected ? $listbox.selected.join(',') : 'Select People'"></button>

            <ul x-listbox:options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person.id"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('button').click()
        get('[option="2"]').click()
        get('ul').should(beVisible())
        get('button').should(haveText('2'))
        get('[option="4"]').click()
        get('button').should(haveText('2,4'))
        get('ul').should(beVisible())
        get('[option="4"]').click()
        get('button').should(haveText('2'))
        get('ul').should(beVisible())
    },
);

// @todo support "static" prop

test('keyboard controls',
    [html`
        <div
            x-data="{ active: null, people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb', disabled: true },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
            x-model="active"
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="active ? active.name : 'Select Person'"></button>

            <ul x-listbox:options options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('.active').should(notExist())
        get('button').focus().type(' ')
        get('[options]')
            .should(beVisible())
            .should(haveFocus())
            .type('{downarrow}')
        get('[option="1"')
            .should(haveClasses(['active']))
        get('[options]')
            .type('{downarrow}')
        get('[option="2"]')
            .should(haveClasses(['active']))
            .type('{downarrow}')
        get('[option="4"]')
            .should(haveClasses(['active']))
        get('[options]')
            .type('{uparrow}')
        get('[option="2"]')
            .should(haveClasses(['active']))
        get('[options]')
            .type('{home}')
        get('[option="1"')
            .should(haveClasses(['active']))
        get('[options]')
            .type('{end}')
        get('[option="10"]')
            .should(haveClasses(['active']))
        get('[options]')
            .type('{pageUp}')
        get('[option="1"')
            .should(haveClasses(['active']))
        get('[options]')
            .type('{pageDown}')
        get('[option="10"]')
            .should(haveClasses(['active']))
        get('[options]')
            .tab()
            .should(haveFocus())
            .should(beVisible())
            .tab({ shift: true })
            .should(haveFocus())
            .should(beVisible())
            .type('{esc}')
            .should(notBeVisible())
    },
)

// @todo support horizontal prop and add tests for it

test('search',
    [html`
        <div
            x-data="{ active: null, people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb', disabled: true },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
            x-model="active"
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="active ? active.name : 'Select Person'"></button>

            <ul x-listbox:options options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get, wait }) => {
        get('.active').should(notExist())
        get('button').click()
        get('[options]')
            .type('ar')
        get('[option="2"')
            .should(haveClasses(['active']))
        wait(500)
        get('[options]')
            .type('ma')
        get('[option="8"]')
            .should(haveClasses(['active']))
    },
)

// @todo update these assertions to be accurate
test('has accessibility attributes',
    [html`
        <div
            x-data="{ active: null, people: [
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene Mccoy' },
                { id: 3, name: 'Devon Webb', disabled: true },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox', disabled: true },
                { id: 6, name: 'Hellen Schmidt' },
                { id: 7, name: 'Caroline Schultz' },
                { id: 8, name: 'Mason Heaney' },
                { id: 9, name: 'Claudie Smitham' },
                { id: 10, name: 'Emil Schaefer' },
            ]}"
            x-listbox
            x-model="active"
        >
            <label x-listbox:label>Assigned to</label>

            <button x-listbox:button x-text="active ? active.name : 'Select Person'"></button>

            <ul x-listbox:options options>
                <template x-for="person in people" :key="person.id">
                    <li
                        :option="person.id"
                        x-listbox:option
                        :value="person"
                        :disabled="person.disabled"
                        :class="{
                            'selected': $listboxOption.isSelected,
                            'active': $listboxOption.isActive,
                        }"
                    >
                        <span x-text="person.name"></span>
                    </li>
                </template>
            </ul>
        </div>
    `],
    ({ get }) => {
        get('button')
            .should(haveAttribute('aria-haspopup', 'true'))
            .should(haveAttribute('aria-labelledby', 'alpine-listbox-label-1'))
            .should(haveAttribute('aria-expanded', 'false'))
            .should(notHaveAttribute('aria-controls'))
            .should(haveAttribute('id', 'alpine-listbox-button-1'))
            .click()
            .should(haveAttribute('aria-expanded', 'true'))
            .should(haveAttribute('aria-controls', 'alpine-listbox-items-1'))

        get('[options]')
            .should(haveAttribute('aria-orientation', 'vertical'))
            .should(haveAttribute('role', 'menu'))
            .should(haveAttribute('id', 'alpine-listbox-items-1'))
            .should(haveAttribute('aria-labelledby', 'alpine-listbox-button-1'))
            .should(notHaveAttribute('aria-activedescendant'))
            .should(haveAttribute('tabindex', '0'))
            .type('{downarrow}')
            .should(haveAttribute('aria-activedescendant', 'alpine-listbox-item-1'))

        get('[option="1"')
            .should(haveAttribute('role', 'menuitem'))
            .should(haveAttribute('id', 'alpine-listbox-item-1'))
            .should(haveAttribute('tabindex', '-1'))

        get('[option="2"]')
            .should(haveAttribute('role', 'menuitem'))
            .should(haveAttribute('id', 'alpine-listbox-item-2'))
            .should(haveAttribute('tabindex', '-1'))

        get('[options]')
            .type('{downarrow}')
            .should(haveAttribute('aria-activedescendant', 'alpine-listbox-item-2'))
    },
)
