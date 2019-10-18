set serveroutput on size 1000000 format truncated

declare
l_first_a   boolean;
l_first_b   boolean;
l_first_x   boolean;
l_first_y   boolean;

--   function random_hex return varchar2 is
--   type t_hex is table of varchar2(1);
--   l_hex   t_hex := t_hex('0','1','2','3','4','5','6','7','8','9','A','B','C','D');
--   l_str   varchar2(6) := '';
--   begin
--      for i in 1 .. 6 loop
--         l_str := l_str || l_hex(trunc(dbms_random.value*l_hex.count)+1);
--      end loop;
--      return l_str;
--   end;

   function hash_color(p_str in varchar2) return varchar2 is
   begin
      return substr(dbms_crypto.hash(utl_raw.cast_to_raw(p_str), 1), 1, 6);
   end;

begin
   dbms_output.put_line('[');
   l_first_a := true;
   for a in ( select nvl(new_id, old_id) id, nvl(new_niveau, old_niveau) || '-' || nvl(new_id, old_id) naam, min(nvl(new_ingangsdatum, old_ingangsdatum)) new_ingangsdatum
              from pensioenproducten_jn
              where nvl(new_id, old_id) in ( 1, 2, 3 )
              group by nvl(new_id, old_id), nvl(new_niveau, old_niveau)
              order by new_ingangsdatum asc )
   loop
      if l_first_a then dbms_output.put_line('{'); l_first_a := false; else dbms_output.put_line(',{'); end if;
      dbms_output.put_line('naam: "' || a.naam || '",');
      dbms_output.put_line('kleur: "#' || hash_color(a.naam) || '",');
      dbms_output.put_line('periodes: [');

      l_first_b := true;
      for b in ( select * from pensioenproducten_jn where nvl(new_id, old_id) = a.id order by jn_date_time asc ) loop
         if l_first_b then dbms_output.put_line('{'); l_first_b := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('omschrijving: "' || b.jn_operation || '-' || nvl(b.new_id, b.old_id) || '",');
         dbms_output.put_line('registratiedatum: "' || to_char(b.jn_date_time, 'yyyy-mm-dd hh24:mi:ss') || '",');
         dbms_output.put_line('ingangsdatum: "' || to_char(b.new_ingangsdatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         if b.new_einddatum is not null then
            dbms_output.put_line(',einddatum: "' || to_char(b.new_einddatum, 'yyyy-mm-dd hh24:mi:ss') || '"');
         end if;
         dbms_output.put_line('}');
      end loop;
      dbms_output.new_line;

      dbms_output.put_line(']');
      dbms_output.put_line('}');

      l_first_x := l_first_b;
      for x in ( select nvl(a.new_kbg_id, a.old_kbg_id) kbg_id, b.variabele naam, min(new_ingangsdatum) new_ingangsdatum
                 from kenmerken_jn a
                 join kenmerk_beschrijvingen b on b.id = a.new_kbg_id
                 join pensioenproduct_kenmerken c on c.kmk_id = nvl(a.new_id, a.old_id)
                 where c.ppt_id = a.id
                 group by nvl(a.new_kbg_id, a.old_kbg_id), b.variabele
                 order by new_ingangsdatum asc )
      loop
         if l_first_x then dbms_output.put_line('{'); l_first_x := false; else dbms_output.put_line(',{'); end if;
         dbms_output.put_line('naam: "' || x.naam || '",');
         dbms_output.put_line('kleur: "#' || hash_color(x.naam) || '",');
         dbms_output.put_line('periodes: [');

         l_first_y := true;
         for y in ( select * from kenmerken_jn a
                    join kenmerk_beschrijvingen b on b.id = a.new_kbg_id
                    join pensioenproduct_kenmerken c on c.kmk_id = nvl(a.new_id, a.old_id)
                    where b.id = x.kbg_id
                    and   c.ppt_id = a.id
                    order by jn_date_time asc, new_id asc ) loop
            if l_first_y then dbms_output.put_line('{'); l_first_y := false; else dbms_output.put_line(',{'); end if;
            dbms_output.put_line('omschrijving: "' || y.jn_operation || '-' || nvl(y.new_id, y.old_id) || '",');
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
   end loop;
   dbms_output.put_line(']');
end;
/