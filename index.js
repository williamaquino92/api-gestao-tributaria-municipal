const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wipisuemzvyczprqpxmr.supabase.co'
const supabasekey = 'sb_publishable_LRE9UhD9DPYVcdZytM3a0A_qjqZjFih'

const supabase = createClient(supabaseUrl, supabasekey)

async function listar() {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*')

    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
}

listar()