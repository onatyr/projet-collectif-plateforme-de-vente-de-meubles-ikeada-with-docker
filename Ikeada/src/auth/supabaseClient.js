// attention MyKey.js est dans GitIgnore pour pas que ça se retrouve sur le net
// donc il faut vous faire la votre :
// creer un fichier "myKey.js"
// dedans : const key = '...whatever'
// -> on importe
import key from './myKey';
const url = 'https://bbrfovbvfzeszrjnhsdp.supabase.co'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

export default supabase

