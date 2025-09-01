export function arrange(str){
        return  /^(\*)(\*)(.*)\*$/.test(str) 
}
export function afterArrange(str){
        return  str.replace(/^(\*)(\*)|(\*)$/g, '')
}