## Dictionary Management Application

This application is made for managing dictionaries (key/value mappings).
Dictionaries are used to clean or normalize values in dataset columns.

### `Example`

Here is an example of a dataset of products, where the phone colours are in their original values:

<table>
    <tr>
        <th>Product</th>
        <th>Color</th>
        <th>Price</th>
    </tr>
    <tr>
        <td>Apple iPhone 6s</td>
        <td>Stonegrey</td>
        <td>799 CHF</td>
    </tr>
    <tr>
        <td>Sony Xperia</td>
        <td>Midnight Black</td>
        <td>599 CHF</td>
    </tr>
    <tr>
        <td>OnePlus 7</td>
        <td>Metallic Blue</td>
        <td>499 CHF</td>
    </tr>
</table>

Here is an example of a dataset, where the colours are more standardised
(for search engine optimization and certain color filters):

<table>
    <tr>
        <th>Product</th>
        <th>Color</th>
        <th>Price</th>
    </tr>
    <tr>
        <td>Apple iPhone 6s</td>
        <td>Grey</td>
        <td>799 CHF</td>
    </tr>
    <tr>
        <td>Sony Xperia</td>
        <td>Black</td>
        <td>599 CHF</td>
    </tr>
    <tr>
        <td>OnePlus 7</td>
        <td>Blue</td>
        <td>499 CHF</td>
    </tr>
</table>

To transform the dataset values, a dictionary is required:

<table>
    <tr>
        <th>Original value</th>
        <th>Desired value</th>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Grey</td>
    </tr>
    <tr>
        <td>Midnight Black</td>
        <td>Black</td>
    </tr>
    <tr>
        <td>Metallic Blue</td>
        <td>Blue</td>
    </tr>
</table>

The 'Original value' -column represents the value to transform and
the 'Desired value' -column is the wanted value. When this dictionary
is applied to the Color -column of the example dataset, the desired
dataset is achieved.
Dictionaries can be edited and removed after creation.

### `Challenges`

To ensure the consistency of dictionaries, they are checked for the
following issues:

<b>Duplicates</b>, two rows map to the same value:

<table>
    <tr>
        <th>Original value</th>
        <th>Desired value</th>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Grey</td>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Grey</td>
    </tr>
    <tr>
        <td>Metallic Blue</td>
        <td>Blue</td>
    </tr>
</table>

<b>Forks</b>, duplicate original values, that map to different desired values:

<table>
    <tr>
        <th>Original value</th>
        <th>Desired value</th>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Grey</td>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Black</td>
    </tr>
    <tr>
        <td>Metallic Blue</td>
        <td>Blue</td>
    </tr>
</table>

<b>Cycles</b>, two or more rows result in cycles that create an infinite loop:

<table>
    <tr>
        <th>Original value</th>
        <th>Desired value</th>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Grey</td>
    </tr>
    <tr>
        <td>Grey</td>
        <td>Stonegrey</td>
    </tr>
    <tr>
        <td>Metallic Blue</td>
        <td>Blue</td>
    </tr>
</table>

<b>Chains</b>, a value in Desired value -column also appears in Original value -column of another entry:

<table>
    <tr>
        <th>Original value</th>
        <th>Desired value</th>
    </tr>
    <tr>
        <td>Stonegrey</td>
        <td>Grey</td>
    </tr>
    <tr>
        <td>Grey</td>
        <td>Dark Grey</td>
    </tr>
    <tr>
        <td>Metallic Blue</td>
        <td>Blue</td>
    </tr>
</table>

If any of these issues occur, a marker is shown next to the row informing the existing errors.
Dictionaries are validated for consistency every time they are created and edited.
