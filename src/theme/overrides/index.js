// ----------------------------------------------------------------------

import IconButton from './IconButton';
import Button from './Button';
import Card from './Card';
import Select from './Select';
import Modal from './Modal';
import MuiCssBaseline from './BaseLine';
import Dialog from './Dialog';
import TextField from './TextField';
import FormLabel from './FormLabel';
import Typography from './Typography';
import InputLabel from './InputLabel';
import Check from './Check';
import Link from './Link';
import DatePicker from './DatePicker';

export default function ComponentsOverrides(theme) {
  return Object.assign(
    IconButton(theme),
    Button(theme),
    Card(theme),
    Select(theme),
    Dialog(theme),
    TextField(theme),
    FormLabel(theme),
    Typography(theme),
    InputLabel(theme),
    Check(theme),
    Link(theme),
    DatePicker(theme)

    // MuiCssBaseline(theme)
  );
}
