set serveroutput on size 1000000 format truncated

declare
l_first_master   boolean;
l_first_detail   boolean;

   function random_hex return varchar2 is
   type t_hex is table of varchar2(1);
   l_hex   t_hex := t_hex('0','1','2','3','4','5','6','7','8','9','A','B','C','D');
   l_str   varchar2(6) := '';
   begin
      for i in 1 .. 6 loop
         l_str := l_str || l_hex(trunc(dbms_random.value*l_hex.count)+1);
      end loop;
      return l_str;
   end;

begin
   dbms_output.put_line('[');
   l_first_master := true;
   for x in ( select b.variabele naam, min(new_ingangsdatum) new_ingangsdatum
              from kenmerken_jn a
              join kenmerk_beschrijvingen b on b.id = a.new_kbg_id
              group by b.variabele
              order by new_ingangsdatum asc )
   loop
      if l_first_master then dbms_output.put_line('{'); l_first_master := false; else dbms_output.put_line(',{'); end if;
      dbms_output.put_line('naam: "' || x.naam || '",');
      dbms_output.put_line('kleur: "#' || random_hex || '",');
      dbms_output.put_line('periodes: [');

      l_first_detail := true;
      for y in ( select * from kenmerken_jn a join kenmerk_beschrijvingen b on b.id = a.new_kbg_id where b.variabele = x.naam order by jn_date_time asc, new_id asc ) loop
         if l_first_detail then dbms_output.put_line('{'); l_first_detail := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('registratiedatum: "' || to_char(y.jn_date_time, 'yyyy-mm-dd hh24:mi:ss') || '",');
         dbms_output.put_line('ingangsdatum: "' || to_char(y.new_ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if y.new_einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(y.new_einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}');
      end loop;
      dbms_output.new_line;
      dbms_output.put_line(']');
      dbms_output.put_line('}');
   end loop;
   dbms_output.put_line(']');
end;
/